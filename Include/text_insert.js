callOnLoad(readTextFile);
async function readTextFile()
{
    let fileName = "";

    let temp = document.getElementsByTagName('script');
    for(let i = 0; i < temp.length; i++) {
        if(temp[i].src.includes('basics.js')) {
            fileName = temp[i].getAttribute('file');
        }
    }

    let json = await fetch(fileName).then((response) => response.json());

    let elements = document.getElementsByClassName('text-insert');
    for(let i = 0; i < elements.length; i++) {
        let elem = elements.item(i);

        elem.innerHTML = json[elem.innerHTML];
    }
}