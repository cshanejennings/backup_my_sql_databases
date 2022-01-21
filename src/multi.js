const fs = require('fs');
const mysqldump = require('mysqldump');
const {gzip, ungzip} = require('node-gzip');
const path = require('path');

const get_config = () => {
  try {
    const json = JSON.parse(fs.readFileSync('../config.json'));
    console.log(json);
    return json;
  } catch (e) { return {
      TEMP_PATH: './',
      BACKUP_PATH: './',
      databases: [
        { database: 'db_name_here' },
      ]
    }
  }
}

const {
  TEMP_PATH,
  BACKUP_PATH,
  databases,
} = get_config();

const update_all = (db_array) => {

  const ts = new Date().toISOString().replace(/[:.]/g, '');
  const backup_db = ({
      host = 'localhost',
      user = 'root',
      password = '',
      database
    }) => {
    (async () => {
      const temp_file_path = `${TEMP_PATH}${database}.dump.sql`;
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
      const path_array = BACKUP_PATH.split('/').join('\\').split('\\')
      const file_path = path.join(...path_array, file_name);
      fs.writeFile(file_path, compressed, function(err) {
        if(err) return next(console.log(err));
        console.log(`created ${file_name}`);
        next();
      });
    })();
  }
  const next = () => {
    const db = db_array.pop();
    console.log(db);
    return (db) ? backup_db(db) : null;
  }
  next();
}

console.log(databases);
update_all([...databases]);
