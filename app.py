#!C:\Program Files (x86)\Python38-32\python.exe
# Import modules for CGI handling
import cgi
import cgitb

#Import omdb API python library
#pip install omdbapi
from omdbapi.movie_search import GetMovie

cgitb.enable()

# Create instance of FieldStorage
form = cgi.FieldStorage()

# Get movie to be searched from the search bar
Searchedmovie = form.getvalue('movie')

#Search for that movie
#API KEY: 11a56ba6
movie = GetMovie(title=Searchedmovie, api_key='11a56ba6')

#Get all information of the movie in json format
movieJsondata = movie.get_all_date()

#add to DB

#Return Json to be displayed on front end