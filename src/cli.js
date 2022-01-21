// node cli.js -backup_path='C:\backups\' -database=exampledatabasename

const args = process.argv.slice(2).reduce((config, arg) => {
  const parts = arg.slice(1).split('=');
  return {...config, [parts[0]]: parts[1]}
}, {});

const { backup_path = '', database = '' } = args;

if ( !backup_path
  || backup_path.indexOf('.') !== -1
  || ( (backup_path.slice(-1) !== '\\') && (backup_path.slice(-1) !== '/') )
  || backup_path.length > 120
) {
  throw error('path specified is not a path');
}

if ( !database
   || !/^[a-z_]+$/.test(database)
) {
  throw error('database specified is not a valid database name');
}

// const BACKUP_PATH = backup_path;
const path_array = backup_path.split('/').join('\\').split('\\')


const fs = require('fs');
const mysqldump = require('mysqldump');
const {gzip, ungzip} = require('node-gzip');
const path = require('path');


  const ts = new Date().toISOString().replace(/[:.]/g, '');
  const backup_db = ({
      host = 'localhost',
      user = 'root',
      password = '',
      database
    }) => {
    (async () => {
      const temp_file_path = path.join(...path_array, `${database}.dump.sql`);
      try {
        const db_dump = await mysqldump({
            connection: {
                host: 'localhost',
                user: 'root',
                password: '',
                database,
            },
            dumpToFile: temp_file_path,
        });
      } catch (e) { console.log(e); }
      const dump_string = fs.readFileSync(temp_file_path);
      fs.unlinkSync(temp_file_path);
      const compressed = await gzip(dump_string);
      const file_name = `${database}-${ts}.sql.gz`;
      const file_path = path.join(...path_array, file_name);
      fs.writeFile(file_path, compressed, function(err) {
        if(err) return console.log(err);
        console.log(`created ${file_name}`);
      });
    })();
  }

backup_db({database});
