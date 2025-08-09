import fs from 'fs';
export const readData = (path: string) => {
  if (!fs.existsSync(path)) return [];
  const data = fs.readFileSync(path, 'utf-8');
  return JSON.parse(data || '[]');
};
export const writeData = (path: string, data: any) => {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
};
