"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

async function userSubmitStoryForm(evt){
  console.debug('userSubmitStoryForm');
  evt.preventDefault();

  const storyTitle = $('#create-title').val();
  const storyUrl = $('#create-url').val();
  const storyAuthor = $('#create-author').val();
  const username = currentUser.username;
  const storyFormData = {storyTitle, storyAuthor, storyUrl, username};

  const story = await storyList.addStory(currentUser, storyFormData);

  const $story = generateStoryMarkup(story);
  $allStoriesList.prepend($story);

  $newStoryForm.slideUp("slow");
  $newStoryForm.trigger("reset");
}

$newStoryForm.on("submit", userSubmitStoryForm);


async function favoriteAStory (){
  console.debug('favoriteAStory')
  // Remember to use postman for code needed to favorite a story!
  
  // Look up how to add favorites in hack-or-snooxe API docs, then copy and paste the POST method to postman, hardcode my username and storyID to get a feel for how the request works, and then copy the code and rewrite it to make it dynamic!


}