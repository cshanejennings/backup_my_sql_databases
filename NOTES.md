### TODO: Note to self on new feature: conditional saves
run a file comparison on the last saved version of a database and only save the new file if different
 * [Stack Overflow answer on using buffer compare](https://stackoverflow.com/questions/25783161/how-to-check-if-two-files-have-the-same-content)
   * [nodejs documentation link](https://nodejs.org/api/all.html#buffer_buf_equals_otherbuffer)
 * npm module [diff](https://www.npmjs.com/package/diff)
   * this one is comprehensive and popular, but probably overkill
 * npm module [filecompare](https://www.npmjs.com/package/filecompare)
   * This one is smal
