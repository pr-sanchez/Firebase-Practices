const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const body = document.body;

const signedInSection = document.getElementById("signedInSection");
const signedOutSection = document.getElementById("signedOutSection");

const signInButton = document.getElementById("signInButton");
const signOutButton = document.getElementById("signOutButton");

signInButton.onclick = handleSignInButtonClick;
signOutButton.onclick = handleSignOutButtonClick;
auth.onAuthStateChanged(handleChangeUserState);

async function handleSignInButtonClick() {
  renderLoader();
  await auth.signInWithPopup(provider);
  removeLoader();
}

function handleSignOutButtonClick() {
  auth.signOut();
}

function handleChangeUserState(user) {
  if (user) {
    signedInSection.classList.remove("is-hidden");
    signedOutSection.classList.add("is-hidden");
  } else {
    signedInSection.classList.add("is-hidden");
    signedOutSection.classList.remove("is-hidden");
  }
}

function renderLoader() {
  const progress = document.createElement("progress");
  progress.className = "progress is-small is-primary";
  progress.id = "loader";
  progress.max = "100";

  body.insertBefore(progress, body.childNodes[0]);
}

function removeLoader() {
  const progress = document.getElementById("loader");
  body.removeChild(progress);
}
