## Learn Git  

#### Get document for a command  

such as  git log -- graph  
```
>>> man git-log  
```
or 
```
>>> git help log 
```

#### Login  

```
>>> git config --global user.name "Your Name Comes Heres"  
>>> git config --global user.email you@yourdomain.example.com  
```

### Initialized  

```java
>>> cd Path
>>> git init
```

#### Take a snapshot  

```
>>> git add .
```
> The snapshot store in a temporary staging area  

or

```
>>> git add file1 file2
```

#### commit  

```
>>> git commit
```

#### See what is about the commit  

```
>>> git diff --cached
```

> Without --cached, git diff will show you any changes that you’ve made but not yet added to the index.) You can also get a brief summary of the situation with git status

#### View history  

view the history of your changes using  
```
>>> git log
```
view complete diffs at each step  
```
>>> git log -p
```
overview of the changes
```
>>> git log --stat --summary
```

### Branches  

#### create a new branches  
```
>>> git branch branch_name  
```

#### list branch  

```
>>> git branch
```
#### switch to the branch  

```
>>> git switch branch_name  
```

### To merge the changes make in brach into master

```
>>> git merge branch_name
```

If there are conflicts  

show conflicts  
```
>>> git diff
```
Once you've edited the files to resolve the conflicts  
```
>>> git commit -a
```
will commit the result of merge,Finally  
```
>>> gitk
```
show a nice graphical representation of the resulting history  

#### Delete branch  

```
>>> git branch -d branch_name
```
> This command ensures that the changes in the experimental branch are already in the current branch.
If you develop on a branch crazy-idea, then regret it, you can always delete the branch with

```  
>>> git branch -D branch_name
```
