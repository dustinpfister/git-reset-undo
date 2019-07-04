# git-reset-undo

Just a simple git undo command. I just made is as a way to make a custom command line tool to which I can just enter a single command to undo the last commit.

Basically this command just turns this:

```
$ git reset --soft HEAD~1
$ git reset
```

Into this:

```
$ g-undo
```

That is all.

## install

So for now just clone down and install globally

```
$ git clone https://github.com/dustinpfister/git-reset-undo --depth 1
$ cd git-reset-undo
$ npm install -g
```