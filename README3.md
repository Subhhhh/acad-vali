To check your current branch,<br>  git branch<br>
To add a new branch,<br>  git checkout -b branchname<br>
To change branches,<br>  git checkout branchname<br>
To rename a branch,<br>  git branch -M newname<br>
To delete a branch,<br>  git branch -d branchname<br>
  (To delete a branch you must not currently be in the same branch)
To push your code simply type,<br>  git push origin branchname<br>and it would reflect only in the desired branch and not the main.(Useful when adding features)<br>
To compare your branch to another branch, firstly go to your branch and then,<br>  git diff otherbranchname<br>
To merge branches, there are 2 ways:<br>
  1. Go to your branch and type in<br>  git merge branchname<br>(branchname) is the branch you want to merge your branch to.<br>
  2. Through Pull Request:
     1. Go to github and go to the "Compare & pull request" option.
     2. Do the required settings and click on "Create pull request".
     3. Finally click on "Merge pull request" and "Confirm merge".
