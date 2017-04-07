# Development
This tool is written in python. To improve our code quality and readability we added [__pylint__](https://www.pylint.org/). Please check with the following, if there is any warning or error before committing your code.
```bash
find . -iname "*.py" | xargs pylint --reports=n
```
