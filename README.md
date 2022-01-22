# Backup mysql databases to folder

This is a personal project to help automate local database backups after a recent crash.  I'm triggering "multi" with a config file through windows task schedule.  I was originally going to use cli parameters through `./src/cli.js` , but while gitbash and powershell took the params, weren't passed through when launching via task scheduler.  I believe there is a workaround using .bat files, so I may do this later to provide more control outside editing the script.

## Vague implementation instructions
To run via `./src/multi.js` Copy and rename `sample_config.json` to `config.json` and update the fields appropriately.  Use standard windows file paths where applicable (e.g. "`F:\backups\sql_daily\`".   I haven't implemented or tested relative paths for anything other than config.json yet, so they probably don't work for the destinations.

### Heavy disclaimer and caveats
This is very new and I have no idea what could cause this to fail.  I also have no idea what size database this will support as I'm not reading and writing in streams so I would recommend testing this extensively before relying on it in any meaningful way. I make no guarantees and assume no liability, use at your own risk if you find this on a search.  I'm saving this here because I would have liked to find this instead of writing it myself.  I may implement stream writing and some tests in the future as my needs change and I start to depend on this more.
