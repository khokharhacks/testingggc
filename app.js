function runRecon(){


let name =
document.getElementById("name").value;


let username =
document.getElementById("username").value;


let email =
document.getElementById("email").value;



if(name=="")
{
alert("Enter target name");
return;
}



let q =
encodeURIComponent(name);



document.getElementById("output").innerHTML=`

<h2>
Recon Report: ${name}
</h2>


<table>


<tr>
<th>Source</th>
<th>Action</th>
</tr>


<tr>

<td>Google Search</td>

<td>
<a target="_blank"
href="https://google.com/search?q=${q}">
Search
</a>
</td>

</tr>


<tr>

<td>Google Dorks</td>

<td>
<a target="_blank"
href="https://google.com/search?q=%22${q}%22">
Exact Match
</a>
</td>

</tr>



<tr>

<td>Facebook</td>

<td>
<a target="_blank"
href="https://google.com/search?q=site:facebook.com+${q}">
Find
</a>
</td>

</tr>



<tr>

<td>Instagram</td>

<td>
<a target="_blank"
href="https://google.com/search?q=site:instagram.com+${q}">
Find
</a>
</td>

</tr>



<tr>

<td>LinkedIn</td>

<td>
<a target="_blank"
href="https://google.com/search?q=site:linkedin.com+${q}">
Find
</a>
</td>

</tr>



<tr>

<td>Email Investigation</td>

<td>
<a target="_blank"
href="https://google.com/search?q=${email}">
Search Email
</a>
</td>

</tr>



</table>


<h3>
Risk Score:
<span style="color:orange">
Medium
</span>
</h3>


`;



drawGraph(name,username,email);


}




function drawGraph(name,user,email){


let data={

nodes:[

{name:name},

{name:"Username\n"+user},

{name:"Email\n"+email},

{name:"Social Media"}

],


links:[

{source:0,target:1},

{source:0,target:2},

{source:0,target:3}

]

};



let svg=d3.select("#graph")
.append("svg")
.attr("width",600)
.attr("height",350);



let simulation=d3.forceSimulation(data.nodes)

.force("link",
d3.forceLink(data.links)
.distance(120))

.force("charge",
d3.forceManyBody().strength(-300))

.force("center",
d3.forceCenter(300,180));



let link=svg.selectAll("line")
.data(data.links)
.enter()
.append("line")
.style("stroke","gray");



let node=svg.selectAll("circle")
.data(data.nodes)
.enter()
.append("circle")
.attr("r",25)
.style("fill","#2563eb");



simulation.on("tick",()=>{

link

.attr("x1",d=>d.source.x)

.attr("y1",d=>d.source.y)

.attr("x2",d=>d.target.x)

.attr("y2",d=>d.target.y);



node

.attr("cx",d=>d.x)

.attr("cy",d=>d.y);


});


}
