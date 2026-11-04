# Django project

This is a self-contained Django project that coexists with the existing OctoFit
Node.js application in this repository.

## Setup

```bash
python -m pip install -r django_project/requirements.txt
python django_project/manage.py migrate
python django_project/manage.py runserver
```

The health endpoint is available at <http://127.0.0.1:8000/health/>.

Run the checks and tests with:

```bash
python django_project/manage.py check
python django_project/manage.py test core
```
