function deleteJob(id){

  console.log("ye delete me aa gaya:=  ");
    const result = confirm(
        'Are you sure you want to delete this product ?'
      );
      console.log("ye result h:= "+ result);
      if (result) {
        console.log("bhai ye id := "+id);
        fetch('/delete/' + id, {
          method: 'POST',
        }).then((res) => {
          if (res.ok) {
            location.reload();
          }
        });
    }
}