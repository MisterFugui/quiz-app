# 推送代码到 GitHub 教程

下面是使用 SSH 将本地改动推送到 GitHub 仓库的完整流程，复制到你的 `README.md` 中即可：

## 1. 确认当前分支与远程

```bash
# 查看当前所在分支（一般是 main 或你自己建的分支名）
git branch

# 确认远程 origin 地址是 SSH
git remote -v
# 应该看到：
# origin  git@github.com:你的用户名/仓库名.git (fetch)
# origin  git@github.com:你的用户名/仓库名.git (push)
git push origin main
