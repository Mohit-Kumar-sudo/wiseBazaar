import requests
from bs4 import BeautifulSoup

URL = "https://app.satta143.in"
page = requests.get(URL)

soup = BeautifulSoup(page.content, "html.parser")

results = soup.find(id="LIVE MATKA RESULT LIST")
#print(results.prettify())
job_elements = results.find_all("div", class_="line")

#for job_element in job_elements:
#    print(job_element, end="\n"*2)
f = open("nums.json", "w")
f.write('[\n')
i = 0
for job_element in job_elements:
    title_element = job_element.find("span")
    #company_element = job_element.find("h3", class_="company")
    #location_element = job_element.find("p", class_="location")
    # print(title_element.text.strip())
    #print(company_element)
    #print(location_element)
    data = title_element.text.strip()
    data = data.split('\n')
    newdata = []
    for datum in data:
        if datum:
            newdata.append(datum)
    f.write('\t{\n\t\t"' + newdata[0]+'":"' + newdata[1] + '"\n\t}')
    if i + 1 is not len(job_elements):
        f.write(',')
    f.write('\n')
    i = i + 1
f.write(']')
f.close()