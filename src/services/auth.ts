import * as fs from 'node:fs'

/**
 * Liest die Liste der Administratoren aus einer JSON-Datei.
 * Gibt ein Array von Strings zurück, das die Namen der Administratoren enthält.
 * 
 * @returns Ein Array von Strings, das die Namen der Administratoren enthält.
 */

export function getAdmins(): string[] {
    const admin = fs.readFileSync('data/admins.json', 'utf-8')
    return JSON.parse(admin).admins
}