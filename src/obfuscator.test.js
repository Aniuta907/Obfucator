import { deleteWhitespaces, deleteMultilineСomments, deleteSinglelineСomments, makeDeadCodeInjection } from './obfuscator.js' 

  describe('obfuscator', () => {
    it('should delete white spaces', () => {
        const result = deleteWhitespaces('this   is  test  string');
        expect(result).toMatch("this is test string");    
    });

    it('should delete multiline comments', () => {
      const testString = `/* функция, удаляющая многострочные комментарии
      abcd
      */
      let a;
      `;
      const result = deleteMultilineСomments(testString);
      expect(result).toMatch("let a;");    
    });

    it('should delete single line comments', () => {
      const testString = "let a; //функция, удаляющая однострочные комментарии";
      const result = deleteSinglelineСomments(testString);
      expect(result).toMatch("let a;");    
    });

    it('should make deadcode injection', () => {
      const testString = "let a;";
      const result = makeDeadCodeInjection(testString);
      expect(result).toContain("let a;");
      expect(result).not.toEqual("let a;");
    });


});