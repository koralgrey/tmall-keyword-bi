import fs from "node:fs";
import path from "node:path";
import XLSX from "xlsx";

const source = process.argv[2];
const target = process.argv[3] ?? "app/data.json";
if (!source) throw new Error("Excel source path is required");

const workbook = XLSX.readFile(source, { cellDates: false });
const sheetName = workbook.Sheets["数据源"] ? "数据源" : "源数据";
const sheet = workbook.Sheets[sheetName];
if (!sheet) throw new Error("未找到“数据源”或“源数据”工作表");
const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

const cleaned = rows.map((row) => ({
  date: String(row["日期"] ?? "").trim(),
  rank: Number(row["排名"] ?? 0),
  categoryPath: String(row["分类名称"] ?? "").trim(),
  keyword: String(row["搜索词"] ?? "").trim(),
  popularity: String(row["搜索人气"] ?? "").trim(),
  ctr: Number(row["点击率"] ?? 0),
  conversion: String(row["支付转化率"] ?? "").trim(),
  category: String(row["类目"] ?? "").trim(),
  month: Number(row["月"] ?? 0),
  week: Number(row["周"] ?? 0),
  year: Number(row["年"] ?? 0),
})).filter((row) => row.keyword && row.category && row.date);

fs.mkdirSync(path.dirname(target), { recursive: true });
fs.writeFileSync(target, JSON.stringify(cleaned));
console.log(`Wrote ${cleaned.length} rows to ${target}`);
