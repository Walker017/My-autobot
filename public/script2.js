async function listOfAi() {
             const userOnline = document.getElementById("user_online");
             const sessions = document.getElementById("active_sessions");
             try {
                 const response = await fetch("/info");
                 const data = await response.json();
                 userOnline.innerHTML = '';
           sessions.textContent = data.length;
                 data.forEach(user => {
                     const {
                         name,
                         thumbSrc,
                         profileUrl,
                         time,
                     } = user;
                     const userCard = document.createElement('div');
                     userCard.className = 'col-12 user-card mb-4';
                     const image = document.createElement('img');
                     image.src = thumbSrc;
                     image.alt = 'User Thumbnail';
                     image.className = 'img-thumbnail';
                     const userInfo = document.createElement('div');
                     userInfo.className = 'user-info';
                     const userName = document.createElement('h4');
                     userName.textContent = "Hidden";
                     //const profileLink = document.createElement('p');
                     //profileLink.innerHTML = `${profileUrl}`;
                     const uptimeUser = document.createElement('p');
                     uptimeUser.className = 'uptime-user';
                     uptimeUser.innerHTML = `Uptime: ${timeFormat(time)}`;
                     userInfo.appendChild(userName);
                     //userInfo.appendChild(profileLink);
                     userInfo.appendChild(uptimeUser);
                     userCard.appendChild(image);
                     userCard.appendChild(userInfo);
                     userOnline.appendChild(userCard);
    
                     const intervalId = setInterval(() => {
                         user.time++;
                         updateTimer(userCard, user.time);
                     }, 1000); 
                 });
             } catch (error) {
                 console.error(error);
                 userOnline.innerHTML = `<div class="alert alert-danger" role="alert">An error occurred while fetching data.</div>`;
             }
         }
         
         function updateTimer(userCard, currentTime) {
             const uptimeUser = userCard.querySelector('.uptime-user');
             uptimeUser.textContent = `Uptime: ${timeFormat(currentTime)}`;
         }
         
        function timeFormat(currentTime) {
            const days = Math.floor(currentTime / (3600 * 24));
            const hours = Math.floor((currentTime % (3600 * 24)) / 3600);
            const minutes = Math.floor((currentTime % 3600) / 60);
            const seconds = currentTime % 60;

            let timeFormat = '';

            switch (true) {
                case days > 0:
                    timeFormat += `${days} day${days > 1 ? 's' : ''} `;
                case hours > 0:
                    timeFormat += `${hours} hour${hours > 1 ? 's' : ''} `;
                case minutes > 0:
                    timeFormat += `${minutes} minute${minutes > 1 ? 's' : ''} `;
                default:
                    timeFormat += `${seconds} second${seconds > 1 ? 's' : ''}`;
            }

            return timeFormat.trim();
        }

         
         listOfAi();

/*async function listOfAi1() {
   const userOnline = document.getElementById("user_online1");
   try {
     const res = await fetch("/info1");
      const data = await res.json();
      userOnline.innerHTML = '';
      data.forEach(user => {
          const {
              name,
              thumbSrc,
              profileUrl,
              time,
          } = user;
           const userCard = document.createElement('div');
           userCard.className = 'col-12 user-card mb-4';
           const image = document.createElement('img');
           image.src = thumbSrc;
           image.alt = 'User Thumbnail';
           image.className = 'img-thumbnail';
           const userInfo = document.createElement('div');
           userInfo.className = 'user-info';
           const userName = document.createElement('h4');
           userName.textContent = "Hidden";
           //const profileLink = document.createElement('p');
           //profileLink.innerHTML = `${profileUrl}`;
           const uptimeUser = document.createElement('p');
           uptimeUser.className = 'uptime-user';
           uptimeUser.innerHTML = `Uptime: ${timeFormat(time)}`;
           userInfo.appendChild(userName);
           //userInfo.appendChild(profileLink);
           userInfo.appendChild(uptimeUser);
           userCard.appendChild(image);
           userCard.appendChild(userInfo);
           userOnline.appendChild(userCard);

           const intervalId = setInterval(() => {
               user.time++;
               updateTimer(userCard, user.time);
           }, 1000);
       });
   } catch (error) {
       console.error(error);
       userOnline.innerHTML = `<div class="alert alert-danger" role="alert">An error occurred while fetching data.</div>`;
   }
}

function updateTimer(userCard, currentTime) {
   const uptimeUser = userCard.querySelector('.uptime-user');
   uptimeUser.textContent = `Uptime: ${timeFormat(currentTime)}`;
}

function timeFormat(currentTime) {
  const days = Math.floor(currentTime / (3600 * 24));
  const hours = Math.floor((currentTime % (3600 * 24)) / 3600);
  const minutes = Math.floor((currentTime % 3600) / 60);
  const seconds = currentTime % 60;

  let timeFormat = '';

  switch (true) {
      case days > 0:
          timeFormat += `${days} day${days > 1 ? 's' : ''} `;
      case hours > 0:
          timeFormat += `${hours} hour${hours > 1 ? 's' : ''} `;
      case minutes > 0:
          timeFormat += `${minutes} minute${minutes > 1 ? 's' : ''} `;
      default:
          timeFormat += `${seconds} second${seconds > 1 ? 's' : ''}`;
  }

  return timeFormat.trim();
}


listOfAi1();*/

/*async function listOfAi2() {
   const userOnline = document.getElementById("user_online2");
   try {
     const res = await fetch("/info2");
      const data = await res.json();
      userOnline.innerHTML = '';
      data.forEach(user => {
          const {
              name,
              thumbSrc,
              profileUrl,
              time,
          } = user;
           const userCard = document.createElement('div');
           userCard.className = 'col-12 user-card mb-4';
           const image = document.createElement('img');
           image.src = thumbSrc;
           image.alt = 'User Thumbnail';
           image.className = 'img-thumbnail';
           const userInfo = document.createElement('div');
           userInfo.className = 'user-info';
           const userName = document.createElement('h4');
           userName.textContent = "Hidden";
           //const profileLink = document.createElement('p');
           //profileLink.innerHTML = `${profileUrl}`;
           const uptimeUser = document.createElement('p');
           uptimeUser.className = 'uptime-user';
           uptimeUser.innerHTML = `Uptime: ${timeFormat(time)}`;
           userInfo.appendChild(userName);
           //userInfo.appendChild(profileLink);
           userInfo.appendChild(uptimeUser);
           userCard.appendChild(image);
           userCard.appendChild(userInfo);
           userOnline.appendChild(userCard);

           const intervalId = setInterval(() => {
               user.time++;
               updateTimer(userCard, user.time);
           }, 1000);
       });
   } catch (error) {
       console.error(error);
       userOnline.innerHTML = `<div class="alert alert-danger" role="alert">An error occurred while fetching data.</div>`;
   }
}

function updateTimer(userCard, currentTime) {
   const uptimeUser = userCard.querySelector('.uptime-user');
   uptimeUser.textContent = `Uptime: ${timeFormat(currentTime)}`;
}

function timeFormat(currentTime) {
  const days = Math.floor(currentTime / (3600 * 24));
  const hours = Math.floor((currentTime % (3600 * 24)) / 3600);
  const minutes = Math.floor((currentTime % 3600) / 60);
  const seconds = currentTime % 60;

  let timeFormat = '';

  switch (true) {
      case days > 0:
          timeFormat += `${days} day${days > 1 ? 's' : ''} `;
      case hours > 0:
          timeFormat += `${hours} hour${hours > 1 ? 's' : ''} `;
      case minutes > 0:
          timeFormat += `${minutes} minute${minutes > 1 ? 's' : ''} `;
      default:
          timeFormat += `${seconds} second${seconds > 1 ? 's' : ''}`;
  }

  return timeFormat.trim();
}


listOfAi2();*/