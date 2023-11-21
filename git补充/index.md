# git补充


[参考资料](https://blog.csdn.net/nanxun201314/article/details/127719569)


## 问题

如果已经推到远程仓库，该怎么撤销

## 其他

从工作目录git add提交到暂存区后，想撤销

注意如果在工作目录创建文件，撤销操作只是不跟踪该文件，并不会把文件删掉

```sh
git reset HEAD xxx
```

或者

```sh
git reset HEAD *
```

从暂存区commit到本地仓库，想撤销到暂存区

```sh
git reset --soft HEAD~1
```

从暂存区commit到本地仓库，想撤销到工作目录

```sh
git reset HEAD~1
```

从暂存区commit到本地仓库，想撤销所有操作，就是在工作目录也没有修改记录

```sh
git reset --hard HEAD~1
```

如果从工作目录add到暂存区（或者add完commit到本地仓库），然后把工作目录某些文件删掉，想要找回（暂存区还有）

```sh
git restore xxx
```

如果从工作目录add到暂存区（或者add完commit到本地仓库），然后修改工作目录的某些文件，想要撤销操作（变得和暂存区一样）

```sh
git restore xxx
```

如果已经push到远程仓库，想要回退到某个版本，必须要使用`--hard`否则不会工作目录不会完全回退成功，还会留有待add的修改记录，这时候再使用`--hard`不会成功回退，解决办法是先使用如下命令到达最新版本，然后再做一次回退

```sh
git reset --hard <commitId>
```

此时只是工作目录，暂存区，本地仓库回退到那个版本，但是远程仓库不变，此时不能push因为本地仓库落后于远程仓库，此时要想让远程仓库变成和本地一样

使用一下命令，可以让远程仓库的不要的提交消失

```sh
git push --force origin master
```

如果想要创建一个提交使得它和之前的提交相同

不知道

---

删除本地仓库某个分支，不能删除活动分支和未合并的分支，可以使用`-D`强制删除

```sh
git branch -d <branch_name>
```

删除远程仓库某个分支

```sh
git push origin --delete <branch_name>
```

创建远程分支，先创建本地分支，然后

```sh
git push origin <branch_name>
```

---

假设在master分支基础上创建了br_merge分支，在两个分支上做修改，然后要合并

先切换到master分支

```sh
git merge br_merge
```

解决冲突后

```sh
git push origin master
```

----

```sh
git stash
```

在工作目录修改，（modified和untracked）还未添加到暂存区，使用 git stash会让modified的部分消失，untracked的文件不变（不会删除）

如果把修改的和创建的添加到暂存区后，使用git stash，modified的部分消失，创建的新文件消失（因为已经 tracked）了

如果已经commit到本地仓库，使用git stash，无效，提示no local changes to save，可见git stash只能适用于未提交的修改，可以让这些修改暂时消失

以上操作都可以使用`git stash pop`恢复变更

---

```sh
git revert <commitId>	
```

形成一个新的commit，撤销commitId的变更，其他commit不变

git pull --rebase/--no-rebase/--ff-only

git merge --ff/--no-ff/--ff-only

FETCH_HEAD
