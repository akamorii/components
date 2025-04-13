import React from "react";

function Post({postData, zxc}) {
  console.log(postData);
    return (
        <div className='post'>

        <div className='post_content'>
          <strong>
            {postData.post.postName}
          </strong>
  
          <div>
            {props.post.postData}
          </div>
        </div>
        </div>
    )
}

export default Post
