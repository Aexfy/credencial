const contactData={name:"Tomás Zúñiga",role:"Analista Programador",company:"",phoneDisplay:"+56 9 5684 5211",phoneInternational:"56956845211",email:"tomasg.zunigac@gmail.com",location:"Los Ángeles, Chile",website:"",whatsappMessage:"Hola, me gustaria solicitar tus servicios."};
const fields={displayName:contactData.name,displayRole:contactData.role,displayCompany:contactData.company,displayPhone:contactData.phoneDisplay,displayEmail:contactData.email,displayLocation:contactData.location};
Object.entries(fields).forEach(([id,value])=>{const element=document.getElementById(id);if(element)element.textContent=value;});
const emailButton=document.getElementById("emailButton");
const whatsappButton=document.getElementById("whatsappButton");
const copyPhoneButton=document.getElementById("copyPhone");
const saveContactButton=document.getElementById("saveContact");
const statusMessage=document.getElementById("statusMessage");
const gmailUrl=new URL("https://mail.google.com/mail/");
gmailUrl.searchParams.set("view","cm");gmailUrl.searchParams.set("fs","1");gmailUrl.searchParams.set("to",contactData.email);gmailUrl.searchParams.set("su","Solicitud de servicios informáticos");gmailUrl.searchParams.set("body",`Hola ${contactData.name}, quiero contactarte.`);
emailButton.href=gmailUrl.toString();emailButton.target="_blank";emailButton.rel="noopener";
whatsappButton.href=`https://wa.me/${contactData.phoneInternational}?text=${encodeURIComponent(contactData.whatsappMessage)}`;
function showStatus(message){statusMessage.textContent=message;window.clearTimeout(showStatus.timer);showStatus.timer=window.setTimeout(()=>{statusMessage.textContent="";},3200);}
function buildVCard(data){const fullName=(data.name||"").trim();const organization=(data.company||"").trim();const title=(data.role||"").trim();return ["BEGIN:VCARD","VERSION:3.0",`FN:${fullName}`,organization?`ORG:${organization}`:"",title?`TITLE:${title}`:"",`TEL;TYPE=CELL:${data.phoneDisplay}`,`EMAIL;TYPE=INTERNET:${data.email}`,`ADR;TYPE=WORK:;;${data.location}`,data.website?`URL:${data.website}`:"","END:VCARD"].filter(Boolean).join("\n");}
function downloadVCard(){const vcard=buildVCard(contactData);const blob=new Blob([vcard],{type:"text/vcard;charset=utf-8"});const url=URL.createObjectURL(blob);const link=document.createElement("a");const fileName=contactData.name.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"")||"contacto";link.href=url;link.download=`${fileName}.vcf`;document.body.appendChild(link);link.click();link.remove();URL.revokeObjectURL(url);showStatus("Contacto listo para guardar en tu telefono.");}
async function copyPhone(){try{await navigator.clipboard.writeText(contactData.phoneDisplay);showStatus("Numero copiado al portapapeles.");}catch{const input=document.createElement("textarea");input.value=contactData.phoneDisplay;input.setAttribute("readonly","");input.style.position="fixed";input.style.opacity="0";document.body.appendChild(input);input.select();const copied=document.execCommand("copy");input.remove();showStatus(copied?"Numero copiado al portapapeles.":`Copia manualmente: ${contactData.phoneDisplay}`);}}
saveContactButton.addEventListener("click",downloadVCard);copyPhoneButton.addEventListener("click",copyPhone);
