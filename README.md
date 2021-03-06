# periodicalAjax: Periodical AJAX calls made the right way

`periodicalAjax` is a small library to make AJAX calls from time to time. It prevents the timer to execute the ajax call before the last one has been completed, avoiding the script to flood the server with requests.

## Usage

  1. Include periodicalAjax.js (or periodicalAjax.min.js) in your html file:

     `<script type="text/javascript" src="periodicalAjax.min.js"></script>`

  2. Call the function to start making ajax calls:

     `$.periodicalAjax(url, frequency, ajaxSettings)`

### Example

  ```
  $.periodicalAjax("/path/to/url", 1000, {
    complete: function(){ alert("Completed!"); }
  });
  ```
  
## Issues

Please feel free to create a new issue if you want a new feature or a bug fix, and forks / pull requests are welcome as well.

## License

Copyright (C) 2012 Rodolfo Carvalho <rodolfo@infweb.net>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
