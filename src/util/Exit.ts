
import fs from 'fs/promises';

export async function exit (code: number, mainFin: string, message: string): Promise <void> {
    const how: string = (await fs.readFile (mainFin, 'utf8')).split ('\n').slice (0, 5).join ('\n');
    console.error (how);
    console.error (`[${code}]`, message);
    process.exit (code);
}
