from setuptools import setup, find_packages

setup(
    name='broccoli_common',
    version='0.1',
    description='Common library for broccoli services',
    url='http://github.com/KTachibanaM/broccoli-platform',
    author='KTachibanaM',
    author_email='whj19931115@gmail.com',
    license='WTFPL',
    packages=find_packages(),
    install_requires=[
        'pytz',
        "python-dotenv",
        "jsonschema"
    ],
    zip_safe=False
)
