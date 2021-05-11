import React from "react";
import { SvgXml } from "react-native-svg";  


type SvgProps = {
  name: 'rise' | 'decrease' | 'badge'
    | 'coinstack' | 'coins';
  width: number;
  height: number;
}
export default function SvgComponent({ name, width, height }: SvgProps){  
  
  let xmls = {
    rise: `
      <svg height="512" viewBox="0 0 32 32" width="512" xmlns="http://www.w3.org/2000/svg"
      ><path 
          d="M26 32H6a6 6 0 01-6-6V6a6 6 0 016-6h20a6 6 0 016 6v20a6 6 0 01-6 6z" 
          fill="#f5e6fe"
        />
        <path 
          d="M8.667 24.167a.668.668 0 01-.352-1.234l7-4.333a.667.667 0 01.822.095l2.195 2.195 3.862-3.862a.668.668 0 01.943.943l-4.333 4.333a.668.668 0 01-.943 0l-2.294-2.293-6.551 4.055a.654.654 0 01-.349.101z" 
          fill="#be63f9"
        />
        <path d="M23.333 20.167a.667.667 0 01-.471-.195l-2.667-2.667a.667.667 0 01.471-1.138h2.667c.368 0 .667.299.667.667V19.5a.666.666 0 01-.667.667z" 
          fill="#be63f9"
        /><g fill="#d9a4fc">
        <path d="M15.587 14.667h-1.92v.833h1.92a.414.414 0 00.413-.413.415.415 0 00-.413-.42zM15.667 13.253a.416.416 0 00-.413-.42h-1.587v.833h1.587a.413.413 0 00.413-.413z"/>
        <path d="M14.333 8.833A5.674 5.674 0 008.666 14.5c0 1.613.689 3.154 1.891 4.227.443.396.944.71 1.483.946l2.829-1.776a1.508 1.508 0 011.859.211l.952.952A5.686 5.686 0 0020 14.5a5.673 5.673 0 00-5.667-5.667zm1.334 7.659V17a.5.5 0 01-1 0v-.5h-.333v.5a.5.5 0 01-1 0v-.5h-.167a.5.5 0 01-.5-.5v-3.666a.5.5 0 01.5-.5h.167v-.5a.5.5 0 011 0v.5h.333v-.5a.5.5 0 011 0v.569c.577.178 1 .71 1 1.345 0 .269-.078.517-.207.73.326.258.54.654.54 1.102 0 .758-.592 1.369-1.333 1.412z"/>
        </g>
      </svg>
    `,
    decrease: `
      <svg enable-background="new 0 0 32 32" height="512" viewBox="0 0 32 32" width="512" xmlns="http://www.w3.org/2000/svg">
      <g id="Layer_2" fill="#ffe6e2"><path d="m26 32h-20c-3.314 0-6-2.686-6-6v-20c0-3.314 2.686-6 6-6h20c3.314 0 6 2.686 6 6v20c0 3.314-2.686 6-6 6z"/><path d="m26 32h-20c-3.314 0-6-2.686-6-6v-20c0-3.314 2.686-6 6-6h20c3.314 0 6 2.686 6 6v20c0 3.314-2.686 6-6 6z"/></g><g id="solid"><g><path d="m22.667 23.5c-.171 0-.341-.065-.471-.195l-3.862-3.862-2.195 2.195c-.218.219-.559.258-.822.095l-7-4.333c-.313-.194-.41-.604-.216-.918.194-.313.604-.41.918-.216l6.551 4.055 2.294-2.293c.26-.26.682-.26.943 0l4.333 4.333c.26.26.26.682 0 .943-.132.131-.303.196-.473.196z" 
      fill="#fc573b"/></g><g><path d="m23.333 24.167h-2.667c-.27 0-.513-.162-.616-.411-.104-.249-.046-.536.145-.727l2.667-2.667c.191-.191.477-.247.727-.145.249.104.411.347.411.616v2.667c0 .368-.298.667-.667.667z" 
      fill="#fc573b"/></g>
      <g fill="#fd907e"><path d="m15.587 14.667h-.333-1.587v.833h1.92c.228 0 .413-.186.413-.413 0-.235-.186-.42-.413-.42z"/><path d="m15.667 13.253c0-.234-.186-.42-.413-.42h-1.587v.833h1.587c.227.001.413-.185.413-.413z"/><path d="m14.333 8.833c-3.124 0-5.667 2.542-5.667 5.667 0 .174.012.346.028.517l6.758 4.243 1.821-1.821c.535-.535 1.373-.574 1.96-.131.483-.841.767-1.8.767-2.808 0-3.125-2.542-5.667-5.667-5.667zm1.334 7.659v.508c0 .276-.224.5-.5.5s-.5-.224-.5-.5v-.5h-.333v.5c0 .276-.224.5-.5.5s-.5-.224-.5-.5v-.5h-.167c-.276 0-.5-.224-.5-.5v-1.833-1.833c0-.276.224-.5.5-.5h.167v-.5c0-.276.224-.5.5-.5s.5.224.5.5v.5h.333v-.5c0-.276.224-.5.5-.5s.5.224.5.5v.569c.577.178 1 .71 1 1.345 0 .269-.078.517-.207.73.326.258.54.654.54 1.102 0 .758-.592 1.369-1.333 1.412z"/></g></g></svg>
    `,
    badge: `
      <svg enable-background="new 0 0 32 32" height="512" viewBox="0 0 32 32" width="512" xmlns="http://www.w3.org/2000/svg"><g id="Layer_2"><path d="m26 32h-20c-3.314 0-6-2.686-6-6v-20c0-3.314 2.686-6 6-6h20c3.314 0 6 2.686 6 6v20c0 3.314-2.686 6-6 6z" 
      fill="#ffe6e2"/></g><g id="solid"><path d="m17 15.087c0-.234-.186-.42-.413-.42h-1.587v.833h1.587c.227 0 .413-.186.413-.413z" fill="#fd907e"/><path d="m16.92 16.5h-.333-1.587v.833h1.92c.228 0 .413-.186.413-.413 0-.234-.185-.42-.413-.42z" 
      fill="#fd907e"/><path d="m23.229 16.391c-.113-.248-.113-.533 0-.781l.596-1.313c.222-.489.232-1.053.026-1.549-.205-.495-.611-.888-1.114-1.076l-1.35-.507c-.256-.096-.457-.298-.553-.553l-.507-1.35c-.188-.503-.581-.908-1.077-1.114-.496-.205-1.06-.196-1.549.027l-1.313.596c-.249.112-.534.112-.782 0l-1.312-.596c-.489-.222-1.053-.232-1.549-.027-.496.206-.888.611-1.077 1.114l-.507 1.35c-.096.255-.297.457-.553.553l-1.349.507c-.503.188-.909.581-1.114 1.076-.205.496-.196 1.061.026 1.549l.596 1.313c.113.248.113.533 0 .781l-.596 1.313c-.222.489-.232 1.053-.026 1.549.205.495.611.888 1.114 1.076l1.35.507c.256.096.457.298.553.553l.507 1.35c.188.503.581.908 1.077 1.114.238.098.491.147.744.147.275 0 .55-.058.805-.174l1.313-.596c.249-.112.533-.112.782 0l1.312.596c.489.223 1.053.232 1.549.027.496-.206.888-.611 1.077-1.114l.507-1.35c.096-.255.297-.457.553-.553l1.349-.507c.503-.188.909-.581 1.114-1.076.205-.496.196-1.061-.026-1.549zm-6.229 1.934v.508c0 .276-.224.5-.5.5s-.5-.224-.5-.5v-.5h-.333v.5c0 .276-.224.5-.5.5s-.5-.224-.5-.5v-.5h-.167c-.276 0-.5-.224-.5-.5v-1.833-1.833c0-.276.224-.5.5-.5h.167v-.5c0-.276.224-.5.5-.5s.5.224.5.5v.5h.333v-.5c0-.276.224-.5.5-.5s.5.224.5.5v.569c.577.178 1 .71 1 1.345 0 .269-.078.517-.207.73.327.259.54.655.54 1.103 0 .758-.592 1.369-1.333 1.411z" 
      fill="#fc573b"/></g></svg>
    `,
    coinstack: `
      <svg enable-background="new 0 0 32 32" height="512" viewBox="0 0 32 32" width="512" xmlns="http://www.w3.org/2000/svg"><g id="Layer_2"><path d="m26 32h-20c-3.314 0-6-2.686-6-6v-20c0-3.314 2.686-6 6-6h20c3.314 0 6 2.686 6 6v20c0 3.314-2.686 6-6 6z" 
      fill="#fff9dd"/></g><g id="solid">
      <g fill="#ffd200"><ellipse cx="13.667" cy="10.333" rx="5.667" ry="2.333"/><path d="m12.94 15.979c.443-.939 1.108-1.75 1.929-2.369-.398.034-.8.057-1.203.057-2.207 0-4.427-.511-5.667-1.498v1.498c.001 1.187 2.156 2.165 4.941 2.312z"/><path d="m12.333 18.667c0-.594.088-1.168.242-1.714-1.823-.14-3.541-.627-4.575-1.451v1.498c0 1.104 1.863 2.026 4.364 2.269-.019-.199-.031-.399-.031-.602z"/></g>
      <g fill="#ffe777"><path d="m18.667 13.333c-2.941 0-5.333 2.393-5.333 5.333s2.392 5.334 5.333 5.334 5.333-2.393 5.333-5.333-2.393-5.334-5.333-5.334zm1 7.683v.508c0 .276-.224.5-.5.5s-.5-.224-.5-.5v-.5h-.333v.5c0 .276-.224.5-.5.5s-.5-.224-.5-.5v-.5h-.167c-.276 0-.5-.224-.5-.5v-1.834-1.833c0-.276.224-.5.5-.5h.167v-.5c0-.276.224-.5.5-.5s.5.224.5.5v.5h.333v-.5c0-.276.224-.5.5-.5s.5.224.5.5v.569c.577.178 1 .71 1 1.345 0 .269-.078.517-.207.73.326.259.54.655.54 1.103 0 .758-.592 1.369-1.333 1.412z"/><path d="m19.587 19.19h-.333-1.587v.833h1.92c.228 0 .413-.186.413-.413 0-.234-.186-.42-.413-.42z"/><path d="m19.667 17.777c0-.234-.186-.42-.413-.42h-1.587v.833h1.587c.227 0 .413-.185.413-.413z"/></g></g></svg>
    `,
    coins: `
      <svg enable-background="new 0 0 32 32" height="512" viewBox="0 0 32 32" width="512" xmlns="http://www.w3.org/2000/svg"><g id="Layer_2"><path d="m26 32h-20c-3.314 0-6-2.686-6-6v-20c0-3.314 2.686-6 6-6h20c3.314 0 6 2.686 6 6v20c0 3.314-2.686 6-6 6z" 
      fill="#e3f8fa"/></g><g id="solid">
      <g fill="#26c6da"><ellipse cx="13.667" cy="10.333" rx="5.667" ry="2.333"/><path d="m12.94 15.979c.443-.939 1.108-1.75 1.929-2.369-.398.034-.8.057-1.203.057-2.207 0-4.427-.511-5.667-1.498v1.498c.001 1.187 2.156 2.165 4.941 2.312z"/><path d="m12.333 18.667c0-.594.088-1.168.242-1.714-1.823-.14-3.541-.627-4.575-1.451v1.498c0 1.104 1.863 2.026 4.364 2.269-.019-.199-.031-.399-.031-.602z"/></g><g><path d="m18.667 13.333c-2.94 0-5.333 2.393-5.333 5.333s2.393 5.333 5.333 5.333 5.333-2.392 5.333-5.332-2.393-5.334-5.333-5.334zm1.94 5.567-1.5 2.833c-.087.167-.254.267-.44.267-.187 0-.353-.1-.44-.267l-1.5-2.833c-.08-.147-.08-.32 0-.467l1.5-2.833c.173-.327.707-.327.88 0l1.5 2.833c.08.147.08.32 0 .467z" 
      fill="#8ce1eb"/></g><path d="m17.732 18.667.935 1.765.934-1.765-.934-1.765z" 
      fill="#8ce1eb"/></g></svg>
    `
  } 

  return <SvgXml xml={xmls[name]} width={width} height={height} />;  
}