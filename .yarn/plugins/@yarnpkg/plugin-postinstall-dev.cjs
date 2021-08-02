/* eslint-disable */
//prettier-ignore
module.exports = {
name: "@yarnpkg/plugin-postinstall-dev",
factory: function (require) {
var plugin=(()=>{var e=Object.create,t=Object.defineProperty;var s=Object.getOwnPropertyDescriptor;var a=Object.getOwnPropertyNames;var i=Object.getPrototypeOf,c=Object.prototype.hasOwnProperty;var u=l=>t(l,"__esModule",{value:!0});var f=l=>{if(typeof require!="undefined")return require(l);throw new Error('Dynamic require of "'+l+'" is not supported')};var g=(l,n)=>{for(var o in n)t(l,o,{get:n[o],enumerable:!0})},m=(l,n,o)=>{if(n&&typeof n=="object"||typeof n=="function")for(let r of a(n))!c.call(l,r)&&r!=="default"&&t(l,r,{get:()=>n[r],enumerable:!(o=s(n,r))||o.enumerable});return l},y=l=>m(u(t(l!=null?e(i(l)):{},"default",l&&l.__esModule&&"default"in l?{get:()=>l.default,enumerable:!0}:{value:l,enumerable:!0})),l);var k={};g(k,{default:()=>h});var p=y(f("child_process")),d={hooks:{afterAllInstalled(){(0,p.spawnSync)("yarn",["run","postinstallDev"])}}},h=d;return k;})();
return plugin;
}
};
