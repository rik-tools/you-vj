[Rik Tools](https://github.com/rik-tools): [You VJ](../readme.md)




# Tutorial
Tutorial introduces the program usage. &nbsp;It is a chatty introduction to some features of You VJ, a program for manipulating YouTube (YT) playlists.  At present, it only operates within its project.


## Preliminarily
This call gives a summary of the commands that You VJ (`yvj`) supports.
```bash
bin/yvj
```


## Workflow
This call prints a list of the user's playlist ids and corresponding playlist names to the console
```bash
bin/yvj show-playlists
```
The user copies-pastes the relevant playlist id from the preceding call; the app persists each id, video id, title, artist and published-at into an SQLite DB table (var/yvj.db: playlist_item).
```bash
bin/yvj ingest <playlist-id>
```
Using the SQLite CLI, we view the data persisted in the previous call(s).  The user can then arrange the video ids into the desired sequence for the final call.
```bash
sqlite3 var/yvj.db "select * from playlist_item"
```
The selection can be refined with `egrep` (because SQLite's where-like may not be as flexible as desired).
```bash
sqlite3 var/yvj.db "select * from playlist_item" | egrep Mahavishnu
```
The user chooses a fresh or existing name for the playlist and organises the video ids into the desired order.
```bash
bin/yvj egest <playlist-name> [<video-id-0> ...]
```
and then we're done 🙂
