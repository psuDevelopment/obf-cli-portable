/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */
/* eslint-disable no-return-await */

import axios from 'axios';
import * as chalk from 'chalk';
import { Command } from 'commander';
import { writeFile } from 'fs/promises';

const Program = new Command();

async function obfuscate(script: string, key: string, options: object) {
  return await axios({
    url: 'https://api.psu.dev/obfuscate',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({
      script,
      key,
      options,
    }),
  });
}

(async () => {
  Program.version('1.0.0');
  Program.option('-eas, --encrypt-all-strings <boolean>', 'enables encrypt all strings', false);
  Program.option('-ms, --maxsecurity <boolean>', 'enables max security', false);
  Program.option('-ds, --disable-superops <boolean>', 'disables super operators', false);
  Program.option('-cf, --enable-cflow <boolean>', 'enables control flow obfuscation', false);
  Program.option('-ce, --constantenc <boolean>', 'enables constant encryption', false);
  Program.option('-ece, --enhanced-constantenc <boolean>', 'enables enhanced constant encryption', false);
  Program.option('-eo, --enhanced-output <boolean>', 'enables enhanced output', false);
  Program.option('-dam, --disable-all-macros <boolean>', 'disables macros', false);
  Program.option('-co, --compressed-output <boolean>', 'compresses output', false);
  Program.option('-pf, --premium-format <boolean>', 'enables premium format', false);
  Program.option('-bm, --bytecode-mode <string>', 'changes the bytecode skin', 'Default');
  Program.option('-k, --key <string>', 'your api-key');
  Program.option('-s, --script <string>', 'the script file');
  Program.parse(process.argv);

  const opts = Program.opts();
  const Options = {
    EncryptAllStrings: opts.encryptAllStrings,
    MaxSecurityEnabled: opts.maxsecurity,
    DisableSuperOperators: opts.disableSuperops,
    ControlFlowObfuscation: opts.enableCflow,
    ConstantEncryption: opts.constantenc,
    EnhancedConstantEncryption: opts.enhancedConstantEnc,
    EnhancedOutput: opts.enhancedOutput,
    DisableAllMacros: opts.disableAllMacros,
    CompressedOutput: opts.compressedOutput,
    PremiumFormat: opts.premiumFormat,
    ByteCodeMode: opts.bytecodeMode,
  };
  try {
    await obfuscate(opts.script, opts.key, Options).then((r) => {
      if (r.data.error === 0) {
        writeFile('./Output.lua', r.data.data);
        console.log(`${chalk.green('[PSU-PORTABLE]: ')}: Successfully written script at ./Output.lua`);
      } else {
        console.log(`${chalk.green('[PSU-PORTABLE]:')} There is an error while making a request!\nError: ${r.data.data}`);
      }
    });
  } catch (err) {
    console.log(`${chalk.green('[PSU-PORTABLE]: ')} An Internal error occured, try obfuscating again.`);
  }
})();
