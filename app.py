#!C:\Program Files (x86)\Python38-32\python.exe
print("Content-type:text/html\n")

# Import modules for CGI handling
import cgi
import cgitb
#Import omdb API python library & requests library
#pip install omdbapi
#pip install requests
from omdbapi.movie_search import GetMovie
import requests

cgitb.enable()
# Create instance of FieldStorage
form = cgi.FieldStorage()

# Get movie to be searched from the search bar
Searchedmovie = form.getvalue('movie')

#Search for that movie
#API KEY: 11a56ba6
movie = GetMovie(title=Searchedmovie, api_key='11a56ba6')

#Get all information of the movie in json format
movieJsondata = movie.get_all_data()

#add to DB

#Return Json to be displayed on front end
print("<html>")
print("<head>")
print("<title>Cinephile</title>")
print("</head>")
print("<body>")
print("<h2> %s </h2>" % (movieJsondata))
print("</body>")
print("</html>")
