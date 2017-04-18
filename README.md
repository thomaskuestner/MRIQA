[![Build Status](https://travis-ci.org/thomaskuestner/MRIQA.svg?branch=master)](https://travis-ci.org/thomaskuestner/MRIQA)

# Usage
To start with a graphical user interface just use the following and select a File via the _File->File open..._-dialog.
```bash
python3 main.py
```

To start without a graphical user interface you can run a pipeline by just setting  the pipeline file as parameter.
```bash
python3 main.py pipeline/dummy.xml
```

# Development
This tool is written in python3. To improve our code quality and readability we added [__pylint__](https://www.pylint.org/). Please check with the following line, if there is any warning or error before committing your code.
```bash
find . -iname "*.py" | xargs pylint --reports=n
```
