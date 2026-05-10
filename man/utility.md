[Rik Tools](https://github.com/rik-tools): [You VJ](../readme.md)



# Utility
Utility details the program interface.


## Prerequisites
* Node v24


## Installation
For the time being, this needs to be run from within its project so
```
git clone http://github.com/rik-tools/you-vj.git
```


## Configuration
I'm happy to add you as a test user within my GCP project.


## Usage
| Invocation                                     | Description                                        |
|------------------------------------------------|----------------------------------------------------|
| `yvj show-playlists                          ` | displays the user's playlists                      |
| `yvj ingest <playlist-id>                    ` | inserts the playlist video data into an SQLite DB  |
| `yvj egest <playlist-name> [<video-id-0> ...]` | (re)creates the playlist with the specified videos |
