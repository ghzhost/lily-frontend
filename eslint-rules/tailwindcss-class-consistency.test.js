 const { RuleTester } = require("eslint");
 const rule = require("./tailwindcss-class-consistency");

 const tester = new RuleTester({
   languageOptions: {
     ecmaVersion: 2020,
     sourceType: "module",
     parserOptions: { ecmaFeatures: { jsx: true } },
   },
 });

 tester.run("tailwindcss-class-consistency", rule, {
   valid: [
     { code: '<div className="flex items-center" />' },
     { code: '<div className="text-sm font-bold" />' },
     { code: '<div className="" />' },
     { code: "<div />" },
   ],
   invalid: [
     {
       code: '<div className="w-[100px]" />',
       errors: [{ messageId: "arbitraryValue" }],
     },
     {
       code: '<div className="flex text-[#ff0000]" />',
       errors: [{ messageId: "arbitraryValue" }],
     },
     {
       code: '<div className={`mt-[20px]`} />',
       errors: [{ messageId: "arbitraryValue" }],
     },
   ],
 });
