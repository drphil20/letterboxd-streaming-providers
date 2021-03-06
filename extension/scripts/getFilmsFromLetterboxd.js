/*!
 *
 *     Copyright (c) 2019 Christian Zei
 *
 *     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *     IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *     AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *     OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *     SOFTWARE.
 *
 *
 */

if (typeof browser === 'undefined') {
  var browser = chrome;
}

var filmposters = document.body.getElementsByClassName('film-poster');

var movies = {};
for (let poster = 0; poster < filmposters['length']; poster++) {
  if (filmposters[poster].attributes.hasOwnProperty('data-film-name')) {
    let film_name = filmposters[poster].attributes['data-film-name'].value;

    if(movies.hasOwnProperty(film_name)) {
      if(movies[film_name].year === -1) {
        movies[film_name].year = filmposters[poster].attributes['data-film-release-year'].value;
      }

      movies[film_name].id.push(poster);
    } else {
      movies[film_name] = {
        year: filmposters[poster].attributes['data-film-release-year'].value,
        id: [poster]
      };
    }
  } else {
    let film_name = filmposters[poster].children[0].alt;

    if(movies.hasOwnProperty(film_name)) {
      movies[film_name].id.push(poster);
    } else {
      movies[film_name] = {
        year: -1,
        id: [poster]
      };
    }
  }
}

browser.runtime.sendMessage({
  message_type: 'movie-titles',
  message_content: movies
});
