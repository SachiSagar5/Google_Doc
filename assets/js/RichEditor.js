var toolbarOptions = [
    ['undo','redo'],        // toggled buttons

    // [{ 'size': ['Heading 1', false, 'Heading 2', 'Heading 3'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    
    [{ 'font': [] }],
    
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
  
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block','image','link','picker'],
  
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'align': [] }],
  
    ['clean']                                         // remove formatting button
  ];
  
  var quill = new Quill('#editor', {
    modules: {
        history: {
            delay: 2000,
            maxStack: 500,
            userOnly: true
          },
      toolbar: toolbarOptions,
      
    },
    theme: 'snow'
  });
  // Undo enterd values
  $('.ql-undo').click(function(){
    quill.history.undo()
   });
//Redo enterd values
   $('.ql-redo').click(function(){
    quill.history.redo()
   })


   // Save Editor data

   function SaveData(){
    
    var delta = quill.getContents();
    if( quill.getLength()>1){
        localStorage.setItem('PageData',JSON.stringify(delta))
    }
   
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
   }

   function ClearData(){
    Swal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
            localStorage.removeItem('PageData')
             quill.setContents({})
          Swal.fire(
            'Deleted!',
            'Enterd value has been deleted.',
            'success'
          )
        }
      })
        
    }
    
   $(document).ready(function(){
    var pagedata = localStorage.getItem('PageData')
        if(pagedata != null){
            quill.setContents(JSON.parse(pagedata))
        }
   })
   
  

   