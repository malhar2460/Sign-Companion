from bs4 import BeautifulSoup
import requests

source = requests.get('http://localhost:3000').text
print(source)