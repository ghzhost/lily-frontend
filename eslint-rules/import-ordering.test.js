 const { RuleTester } = require("eslint");
 const rule = require("./import-ordering");

 const tester = new RuleTester({
   languageOptions: {
     ecmaVersion: 2020,
     sourceType: "module",
   },
 });

 tester.run("import-ordering", rule, {
  valid: [
    { code: 'import fs from "fs";\nimport path from "path";' },
    { code: 'import fs from "fs";\nimport express from "express";' },
     { code: 'import express from "express";\nimport "@/lib/utils";' },
     { code: 'import express from "express";\nimport "./local";' },
     { code: 'import fs from "fs";\nimport express from "express";\nimport "@/lib";\nimport "./local";' },
     { code: 'import single from "single";' },
   ],
   invalid: [
     {
       code: 'import express from "express";\nimport fs from "fs";',
       errors: [{ messageId: "wrongOrder" }],
     },
     {
       code: 'import "@/lib";\nimport express from "express";',
       errors: [{ messageId: "wrongOrder" }],
     },
     {
       code: 'import "./local";\nimport express from "express";',
       errors: [{ messageId: "wrongOrder" }],
     },
     {
       code: 'import "./local";\nimport "@/lib";',
       errors: [{ messageId: "wrongOrder" }],
     },
   ],
 });
