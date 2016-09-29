# woobject
This project contains functions for work on object.

example accesing :
<pre>
<code class="language-javascript">
var person = {
  data: {
    firstname:'Kevin'
  }
};

//return kevin
_woobject.get(person, 'data.firstname'); 

//add the property lastname with the value Leclerc to the person.data object.
_woobject.set(person, 'data.lastname', 'Leclerc'); 
</code>
</pre>

You can clone different object in one easily :
<pre>
<code class="language-javascript">
var person = {
  data: {
    firstname:'Kevin'
  }
};

var person2 = {
  data: {
    lastname:'Leclerc'
  }
};

_woobject.extend(true, {}, person, person2);

//the result is simply the merge of two :

{
  data: {
    firstname:'Kevin',
    lastname:'Leclerc'
  }
};
</code>
</pre>

The clone done is a true one, you have distinct object from the source.
