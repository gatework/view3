import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

async function importDateUtil () {
  const source = await readFile(new URL('../../src/utils/date.js', import.meta.url), 'utf8')
  const moduleUrl = `data:text/javascript;charset=utf-8,${encodeURIComponent(source)}`
  const { default: fecha } = await import(moduleUrl)
  return fecha
}

const fecha = await importDateUtil()

const parsedDayOfWeek = fecha.parse('01 05 2026', 'DD dd yyyy')
assert.equal(parsedDayOfWeek instanceof Date, true)
assert.equal(parsedDayOfWeek.getDate(), 5)
assert.equal(parsedDayOfWeek.getFullYear(), 2026)

const parsedDayOfMonth = fecha.parse('05 2026', 'dd yyyy')
assert.equal(parsedDayOfMonth instanceof Date, true)
assert.equal(parsedDayOfMonth.getDate(), 5)
assert.equal(parsedDayOfMonth.getFullYear(), 2026)

const formatted = fecha.format(new Date(2026, 4, 5, 9, 7, 6), 'MM-dd-yyyy HH:mm:ss')
assert.equal(formatted, '05-05-2026 09:07:06')
