/**
 * 从html中提取文字
 * @param html 
 * @returns 
 */
export function trimText(html: string, length: number = 100): string {
    const ele = document.createElement('div')
    ele.innerHTML = html
    return ele.innerText.substring(0, length)
}