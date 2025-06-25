async function fetchNotes() {
    try{
        console.log('Fetching Notes......');

        const search=document.getElementById("searchInput")?.value||'';
        const sort=document.getElementById('sortSelect')?.value||'latest';

        const res=await fetch(`http://localhost:5000/notes?search=${encodeURIComponent(search)}&sort=${sort}`);
        const notes=await res.json();

        console.log('Fetched Notes : ',notes);
        const container=document.getElementById('notesContainer');
        container.innerHTML='';

        notes.forEach(note=>{
            const noteDiv=document.createElement('div');
            noteDiv.classList.add('note-card');

            const ext=note.imageUrl.split('.').pop().toLowerCase();
            let filePreview='';

            if(['jpg','jpeg','png','gif'].includes(ext)){
                filePreview=`<img src="http://localhost:5000${note.imageUrl}" alt="Note Image" class="note-preview"/>`;
            }
            else if(ext=='pdf'){
                filePreview=`<p><a href="http://localhost:5000${note.imageUrl}" target="_blank"> 📄 View PDF</a></p>`;
            }
             else if(ext=='txt'){
                filePreview=`<p><a href="http://localhost:5000${note.imageUrl}" target="_blank"> 📄 View TXT File</a></p>`;
            }
            else{
                filePreview=`<p>📁 Unsupported File Type</p>`;
            }

            noteDiv.innerHTML=`
            ${filePreview}
            <h2>${note.title}</h2>
            <p>${note.description}</p>
            <p><strong>Tags:</strong>${note.tags.join(',')}</p>
            <small>Uploaded on${new Date(note.createdAt).toLocaleString()}</small>
            `;

            container.appendChild(noteDiv);
        });
        
    }
    catch(err){
        console.error('Failed to load notes: ',err);
    }
}

fetchNotes();
