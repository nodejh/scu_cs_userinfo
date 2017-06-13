echo -e "\033[0;32mPush updates to GitHub...\033[0m"
# Add changes to git.
git add -A

# Commit changes.
msg="update at `date`"
if [ $# -eq 1 ]
  then msg="$1"
fi
git commit -m "$msg"

# Push source and build repos.
git push origin master
