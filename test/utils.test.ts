//@ts-ignore
import { expect, test, describe } from 'bun:test';

// @Utils
import { parseDiff, getChangedFiles } from '../src/utils';
describe('parseDiff', () => {
  test('should parse diff and extract file names', () => {
    const mockDiff = `--- a/file1.js
+++ b/file2.js
--- a/file3.js
+++ b/file4.js
`;

    const expected = ['file2.js', 'file4.js'];

    expect(parseDiff(mockDiff)).toEqual(expected);
  });

  test('should handle an empty diff', () => {
    expect(parseDiff('')).toEqual([]);
  });

  test('should handle a diff with multiple "+++ b/" lines in a row', () => {
    const mockDiff = `--- a/file1.js
+++ b/file2.js
+++ b/file3.js
+++ b/file4.js
`;

    const expected = ['file2.js', 'file3.js', 'file4.js'];

    expect(parseDiff(mockDiff)).toEqual(expected);
  });
});

describe('getChangedFiles', () => {
  test('should format an array of files into a list with asterisks', () => {
    const files = ['file1.js', 'file2.js', 'file3.js'];
    const expected = '* file1.js\n* file2.js\n* file3.js';
    expect(getChangedFiles(files)).toEqual(expected);
  });
});
