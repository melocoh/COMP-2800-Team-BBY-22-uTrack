// Tracks how many modals have been created (first is already created, continue at 2)
var divCounter = 2;
var itemCounter = 4;

var div_modal = `<div class="modal fade" id="myModal` + divCounter + `" tabindex="-1" role="dialog" aria-labelledby="exampleModal3Label"
aria-hidden="true">
<div class="modal-dialog" role="document">
    <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
            <img class="storeLogos" id="storeLogo1">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <!-- Modal Body -->
        <div class="modal-body">
            <ul>
                <li>
                    <div class="logo_container">
                        <!-- Dummy Image: https://dummyimage.com/50x50/000/fff -->
                        <img class="icons" src="./images/icon_mask.png" />
                    </div>
                    <span class="item1` + itemCounter + ` items">Item here</span>
                    <span class="stock` + itemCounter + ` stocks">Val</span>
                </li>
                <li>
                    <div class="logo_container">
                        <img class="icons" src="./images/70909-200.png" />
                    </div>
                    <span class="item` + itemCounter + ` items">Item here</span>
                    <span class="stock` + itemCounter + ` stocks">Val</span>
                </li>
                <li>
                    <div class="logo_container">
                        <img class="icons" src="./images/icon_handsantizer.png" />
                    </div>
                    <span class="item` + itemCounter + ` items">Item here</span>
                    <span class="stock` + itemCounter + ` stocks">Val</span>
                </li>
            </ul>
        </div>
        <!-- Modal Footer -->
        <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal" onclick="window.location.href='./post.html'">View Posts</button>
        </div>
    </div>
</div>
</div>`;