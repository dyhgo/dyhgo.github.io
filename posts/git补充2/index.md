# git补充2



如何更优雅地使用git，包含merge，pull，合并commit

实验工具是gitlab

## pre

在[gitlab](https://about.gitlab.com/)上登录，只能免费试用一个月

## 本地merge

指本地分支合并到本地分支

假设在master分支上生成dev分支
### fast-forward

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/7783b77912124d7089943fa1720bf1e9.png)


dev分支对master分支来说是完全增量commit才可以ff

`master> git merge dev`



### recursive

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/619e1d8c9a914469a4be86eb8af9662c.png)



这种merge方式的commit是按时间顺序排的

`master> git merge dev`

解决冲突，然后

`master> git add .`

`master> git commit -m "new commit"`

### rebase

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/de7fd3848c794a1fb1cafca339e0148f.png)


`dev> git rebase master` （把master的commit放dev的commit后）

解决冲突

`dev> git add .`

`dev> git rebase --continue` 注意不是commit

如果dev上有多个commit，则需要再次解决冲突

再次

`dev> git add .`

`dev> git rebase --continue`

一直重复直到没有冲突，最后

`master> git merge dev`（此时是ff了）


## 远程merge

指合并涉及到远程分支

大多数做法是在本地建立一个分支（一般是相同分支名）和远程分支对应，然后先pull远程分支，再在本地进行分支合并

## pull

pull = fetch + merge 或者 fetch + rebase

假设master分支上创造dev分支，要pull的是master

### fast-forward

origin/master分支对dev分支来说是完全增量commit才可以ff

`dev> git pull origin master`

`dev> git push origin dev`

### recursive

`dev> git pull origin master --no-rebase`

解决冲突

`dev> git add .`

`dev> git commit -m "new commit"`

`dev> git push origin dev`

### rebase

`dev> git pull origin master --rebase`

解决冲突

`dev> git add .`

`dev> git rebase --continue` （注意不是commit）

如果dev有多个提交，则要再次解决冲突

再次

`dev> git add .`

`dev> git rebase --continue`


知道没有冲突，最后

`dev> git push origin dev`


## commit合并

指将一个分支的多个commits合并成一个，可以让开发记录更加清晰

假设在dev分支上操作
### 当前不提交commit，仅合并以前的commit

#### rebase

#####  local

`dev> git rebase -i HEAD~3` （表示合并最后3个commit）

在编辑界面上，第一个commit选pick，后面都选squash

在编辑界面上填写合并的commit信息

#####  remote

同local，最后要

`dev> git push origin dev -f`


#### reset

##### local

`dev> git reset xxx` （假设要合并最后3个commit，则xxx是倒数第4个commitId）

`dev> git add .`

`dev> git commit -m "merged commit message"`



##### remote

同local，push时要

`dev> git push origin dev -f`

### 当前提交commit，且和上一个commit合并

`dev> git commit --amend --no-edit`

要推到远程仓库就是

`dev> git push origin dev -f`（由于你合并了commit所以导致本地和远程出现分叉，需要强推）

## merge request

mr时最后用合并commit，把同一个mr的多个commit在提交时就合并

在开发过程中也可以多合并commit

mr有冲突的时候可以提交mr，但是要在解决完冲突后才可以合并到master

## 修改某个commit的变更内容


假设要修改倒数第二个commit的变更内容

`git rebase -i HEAD~3`

或者

`git rebase -i <3rd-to-last commit-id>`

将要变更的commit那一行的第一个单词pick改成e或edit

修改内容

`git add .`

可以修改提交信息也可以不改

`git commit --amend` （注意这里和之前不一样要用commit，如果不用commit，直接用rebase，它会自动执行commit，然后编辑提交信息）

`git rebase --continue`，如果倒数第二个提交和倒数第一个提交冲突，就无法rebase成功，需要解决冲突

解决完冲突后，`git add .` 然后 `git rebase --continue`，就可以保持完整的提交数量，且倒数第二个提交是你最开始修改的（解决冲突前的），倒数第一个提交是解决冲突后的内容（因为冲突，不再是原来的内容），注意如果使用`git add .` 之后使用 `git commit --amend`， 则倒数第一个提交会没掉，倒数第二个提交变成解决冲突后的内容

如果已提交到远程仓库，就	`git push -f`


