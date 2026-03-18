import fs from 'node:fs';
import chalk from 'chalk';
import $ from 'dekko';

$('dist/antd.css')
  .isFile()
  .assert(
    "doesn't contain :where(",
    (filename: string) => !fs.readFileSync(filename).toString().includes(':where('),
  )
  .assert('contain .g-modal-confirm', (filename: string) =>
    fs.readFileSync(filename).toString().includes('.g-modal-confirm'),
  );

console.log(chalk.green('✨ antd.css is valid (no ":where(" and contains ".g-modal-confirm")'));
