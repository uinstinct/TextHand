# Text Hand

Convert typed text to handwriting with this app



## KeyPoints

#### For function `convertDivToImage` in *takeSnapshots.js*

* the scale does not default to 1 but to the browser window device pixel ration
* disabling the scale option results in a higher quality image
* replace this with blur filter of canvas
* use blur as slider and show in overlay
* make indentation optional
     

#### Variable `clientHeight` value

height of .page-content when there is no content (increase this value to remove space at the bottom)

#### Reason for addition of `+1` in `totalPages` in  *takeSnapshots.js*

always add +1 to get the extra page to due to random font size


