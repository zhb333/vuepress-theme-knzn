"use strict";(self.webpackChunkvuepress_theme_knzn=self.webpackChunkvuepress_theme_knzn||[]).push([[7764],{1821:(n,s,a)=>{a.r(s),a.d(s,{data:()=>e});const e=JSON.parse('{"key":"v-8d22c02c","path":"/10abf20943b19ec42ca8827992ebe7ee/","title":"04 八个 JS 中你见过的类型","lang":"zh-CN","frontmatter":{"permalink":"/10abf20943b19ec42ca8827992ebe7ee/","title":"04 八个 JS 中你见过的类型","author":"前端程序猿","tags":["typescript"],"categories":["大前端"],"postImage":"/images/typescript.webp"},"excerpt":"<p>这小节你学习起来会很轻松，这是你正式接触 TypeScript 语法的第一节课，是最最基础的语法单元。这节课我们\\n将学习在 JavaScript 中现有的八个数据类型，当然这并不是 JavaScript 中的所有数据类型，而是现在版本的\\nTypeScript 支持的基本类型，在学习基础类型之前，我们先来看下如何为一个变量指定类型：</p>\\n","headers":[{"level":2,"title":"1. 布尔类型","slug":"_1-布尔类型","children":[]},{"level":2,"title":"2. 数值类型","slug":"_2-数值类型","children":[]},{"level":2,"title":"3. 字符串","slug":"_3-字符串","children":[]},{"level":2,"title":"4. 数组","slug":"_4-数组","children":[]},{"level":2,"title":"5. null 和 undefined","slug":"_5-null-和-undefined","children":[]},{"level":2,"title":"6. object","slug":"_6-object","children":[]},{"level":2,"title":"7. symbol","slug":"_7-symbol","children":[]},{"level":2,"title":"本节小结","slug":"本节小结","children":[]}],"git":{"updatedTime":1659093557000,"contributors":[{"name":"张焕标","email":"1140457303@qq.com","commits":1}]},"filePathRelative":"TypeScript学习笔记/04-types-you-have-seen-in-the-eight-JS.md"}')},8815:(n,s,a)=>{a.r(s),a.d(s,{default:()=>o});var e=a(6252);const t=[(0,e.uE)('<p>这小节你学习起来会很轻松，这是你正式接触 TypeScript 语法的第一节课，是最最基础的语法单元。这节课我们 将学习在 JavaScript 中现有的八个数据类型，当然这并不是 JavaScript 中的所有数据类型，而是现在版本的 TypeScript 支持的基本类型，在学习基础类型之前，我们先来看下如何为一个变量指定类型：</p><blockquote><p>生活永远不像我们想像的那样好，但也不会像我们想像的那样糟。 ——莫泊桑</p></blockquote><p>为一个变量指定类型的语法是使用&quot;变量: 类型&quot;的形式，如下：</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">let</span> num<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> <span class="token number">123</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果你没有为这个变量指定类型，编译器会自动根据你赋给这个变量的值来推断这个变量的类型：</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">let</span> num <span class="token operator">=</span> <span class="token number">123</span>\nnum <span class="token operator">=</span> <span class="token string">&#39;abc&#39;</span> <span class="token comment">// error 不能将类型“&quot;123&quot;”分配给类型“number”</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们给 <code>num</code> 赋值为 123 但没有指定类型时，编译器推断出了 <code>num</code> 的类型为 <code>number</code> 数值类型，所以当给 <code>num</code> 再赋 值为字符串&quot;abc&quot;时，就会报错。</p><p>这里还有一点要注意，就是 number 和 Number 的区别：TS 中指定类型的时候要用 <code>number</code> ，这个是 TypeScript 的类 型关键字。而 Number 为 JavaScript 的原生构造函数，用它来创建数值类型的值，它俩是不一样的。包括你后面见 到的 string、boolean 等都是 TypeScript 的类型关键字，不是 JavaScript 语法，这点要区分开。接下来我们来看本节 课的重点：八个 JS 中你见过的类型。</p><h2 id="_1-布尔类型" tabindex="-1"><a class="header-anchor" href="#_1-布尔类型" aria-hidden="true">#</a> 1. 布尔类型</h2><p>类型为布尔类型的变量的值只能是 true 或 false，如下：</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">let</span> bool<span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token operator">=</span> <span class="token boolean">false</span>\nbool <span class="token operator">=</span> <span class="token boolean">true</span>\nbool <span class="token operator">=</span> <span class="token number">123</span> <span class="token comment">// error 不能将类型&quot;123&quot;分配给类型&quot;boolean&quot;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然了，赋给 bool 的值也可以是一个计算之后结果是布尔值的表达式，比如：</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">let</span> bool<span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token operator">=</span> <span class="token operator">!</span><span class="token operator">!</span><span class="token number">0</span>\n<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>bool<span class="token punctuation">)</span> <span class="token comment">// false</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-数值类型" tabindex="-1"><a class="header-anchor" href="#_2-数值类型" aria-hidden="true">#</a> 2. 数值类型</h2><p>TypeScript 和 JavaScript 一样，所有数字都是浮点数，所以只有一个 <code>number</code> 类型，而没有 <code>int</code> 或者 <code>float</code> 类型。而 且 TypeScript 还支持 ES6 中新增的二进制和八进制数字字面量，所以 TypeScript 中共支持二、八、十和十六四种 进制的数值。</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">let</span> num<span class="token operator">:</span> <span class="token builtin">number</span>\nnum <span class="token operator">=</span> <span class="token number">123</span>\nnum <span class="token operator">=</span> <span class="token string">&#39;123&#39;</span> <span class="token comment">// error 不能将类型&quot;123&quot;分配给类型&quot;number&quot;</span>\nnum <span class="token operator">=</span> <span class="token number">0b1111011</span> <span class="token comment">// 二进制的123</span>\nnum <span class="token operator">=</span> <span class="token number">0o173</span> <span class="token comment">// 八进制的123</span>\nnum <span class="token operator">=</span> <span class="token number">0x7b</span> <span class="token comment">// 十六进制的123</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-字符串" tabindex="-1"><a class="header-anchor" href="#_3-字符串" aria-hidden="true">#</a> 3. 字符串</h2><p>字符串类型中你可以使用单引号和双引号包裹内容，但是可能你使用的 tslint 规则会对引号进行检测，使用单引号 还是双引号可以在 tslint 规则里配置。你还可以使用 ES6 语法——模板字符串，拼接变量和字符串更为方便。</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">let</span> str<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token string">&#39;Lison&#39;</span>\nstr <span class="token operator">=</span> <span class="token string">&#39;Li&#39;</span>\n<span class="token keyword">const</span> first <span class="token operator">=</span> <span class="token string">&#39;Lison&#39;</span>\n<span class="token keyword">const</span> last <span class="token operator">=</span> <span class="token string">&#39;Li&#39;</span>\nstr <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>first<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>last<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span>\n<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span> <span class="token comment">// 打印结果为:Lison Li</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另外还有个和字符串相关的类型：字符串字面量类型。即把一个字符串字面量作为一种类型，比如上面的字符 串&quot;Lison&quot;，当你把一个变量指定为这个字符串类型的时候，就不能再赋值为其他字符串值了，如：</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">let</span> str<span class="token operator">:</span> <span class="token string">&#39;Lison&#39;</span>\nstr <span class="token operator">=</span> <span class="token string">&#39;haha&#39;</span> <span class="token comment">// error 不能将类型“&quot;haha&quot;”分配给类型“&quot;Lison&quot;”</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-数组" tabindex="-1"><a class="header-anchor" href="#_4-数组" aria-hidden="true">#</a> 4. 数组</h2><p>在 TypeScript 中有两种定义数组的方式：</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">let</span> list1<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span>\n<span class="token keyword">let</span> list2<span class="token operator">:</span> <span class="token builtin">Array</span><span class="token operator">&lt;</span><span class="token builtin">number</span><span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>第一种形式通过 <code>number[]</code> 的形式来指定这个类型元素均为 number 类型的数组类型，这种写法是推荐的写法，当然 你也可以使用第二种写法。注意，这两种写法中的 <code>number</code> 指定的是数组元素的类型，你也可以在这里将数组的元 素指定为任意类型。如果你要指定一个数组里的元素既可以是数值也可以是字符串，那么你可以使用这种方式： <code>number|string[]</code> ，这种方式我们在后面学习联合类型的时候会讲到。</p><p>当你使用第二种形式定义时，tslint 可能会警告让你使用第一种形式定义，如果你就是想用第二种形式，可以通过在 tslint.json 的 rules 中加入 <code>&quot;array-type&quot;: [false]</code> 关闭 tslint 对这条的检测。</p><p>后面我们讲接口的时候，还会讲到数组的一个特殊类型：ReadonlyArray，即只读数组。</p><h2 id="_5-null-和-undefined" tabindex="-1"><a class="header-anchor" href="#_5-null-和-undefined" aria-hidden="true">#</a> 5. null 和 undefined</h2><p>null 和 undefined 有一些共同特点，所以我们放在一起讲。说它们有共同特点，是因为在 JavaScript 中，undefined 和 null 是两个基本数据类型。在 TypeScript 中，这两者都有各自的类型即 undefined 和 null，也就是说它们既是实 际的值，也是类型，来看实际例子：</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">let</span> u<span class="token operator">:</span> <span class="token keyword">undefined</span> <span class="token operator">=</span> <span class="token keyword">undefined</span>\n<span class="token comment">// 这里可能会报一个tslint的错误：Unnecessary initialization to &#39;undefined&#39;，就是不能给一个值赋undefined，但我们知道这是可以的，所以如果你的代码规范想让这种代码合理化，可以配置tslint，将&quot;no-unnecessary-initializer&quot;设为false即可</span>\n<span class="token keyword">let</span> n<span class="token operator">:</span> <span class="token keyword">null</span> <span class="token operator">=</span> <span class="token keyword">null</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>默认情况下 undefined 和 null 可以赋值给任意类型的值，也就是说你可以把 undefined 赋值给 void 类型，也可以赋 值给 number 类型。当你在 tsconfig.json 的&quot;compilerOptions&quot;里设置了 <code>&quot;strictNullChecks&quot;: true</code> 时，那必须严格对 待。undefined 和 null 将只能赋值给它们自身和 void 类型，void 类型我们后面会学习。</p><h2 id="_6-object" tabindex="-1"><a class="header-anchor" href="#_6-object" aria-hidden="true">#</a> 6. object</h2><p>object 在 JS 中是引用类型，它和 JS 中的其他基本类型不一样，像 number、string、boolean、undefined、null 这 些都是基本类型，这些类型的变量存的是他们的值，而 object 类型的变量存的是引用，看个简单的例子：</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">let</span> strInit <span class="token operator">=</span> <span class="token string">&#39;abc&#39;</span>\n<span class="token keyword">let</span> strClone <span class="token operator">=</span> strInit\nstrClone <span class="token operator">=</span> <span class="token string">&#39;efg&#39;</span>\n<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>strInit<span class="token punctuation">)</span> <span class="token comment">// &#39;abc&#39;</span>\n<span class="token keyword">let</span> objInit <span class="token operator">=</span> <span class="token punctuation">{</span> a<span class="token operator">:</span> <span class="token string">&#39;aa&#39;</span> <span class="token punctuation">}</span>\n<span class="token keyword">let</span> objClone <span class="token operator">=</span> objInit\n<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>objClone<span class="token punctuation">)</span> <span class="token comment">// {a:&quot;aa&quot;}</span>\nobjInit<span class="token punctuation">.</span>a <span class="token operator">=</span> <span class="token string">&#39;bb&#39;</span>\n<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>objClone<span class="token punctuation">)</span> <span class="token comment">// { a: &#39;bb&#39; }</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过例子可以看出，我们修改 objInit 时，objClone 也被修改了，是因为 objClone 保存的是 objInit 的引用，实际上 objInit 和 objClone 是同一个对象。</p><p>当我们希望一个变量或者函数的参数的类型是一个对象的时候，使用这个类型，比如：</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">let</span> obj<span class="token operator">:</span> object\nobj <span class="token operator">=</span> <span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token string">&#39;Lison&#39;</span> <span class="token punctuation">}</span>\nobj <span class="token operator">=</span> <span class="token number">123</span> <span class="token comment">// error 不能将类型“123”分配给类型“object”</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里有一点要注意了，你可能会想到给 obj 指定类型为 object 对象类型，然后给它赋值一个对象，后面通过属性访 问操作符访问这个对象的某个属性，实际操作一下你就会发现会报错：</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">let</span> obj<span class="token operator">:</span> object\nobj <span class="token operator">=</span> <span class="token punctuation">{</span> name<span class="token operator">:</span> <span class="token string">&#39;Lison&#39;</span> <span class="token punctuation">}</span>\n<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>name<span class="token punctuation">)</span> <span class="token comment">// error 类型“object”上不存在属性“name”</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里报错说类型 object 上没有 name 这个属性。如果你想要达到这种需求你应该使用我们后面章节要讲到的接口， 那 object 类型适合什么时候使用呢？我们前面说了，当你希望一个值必须是对象而不是数值等类型时，比如我们定 义一个函数，参数必须是对象，这个时候就用到 object 类型了：</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">getKeys</span><span class="token punctuation">(</span>obj<span class="token operator">:</span> object<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span> <span class="token comment">// 会以列表的形式返回obj中的值</span>\n<span class="token punctuation">}</span>\n<span class="token function">getKeys</span><span class="token punctuation">(</span><span class="token punctuation">{</span> a<span class="token operator">:</span> <span class="token string">&#39;a&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token comment">// [&#39;a&#39;]</span>\n<span class="token function">getKeys</span><span class="token punctuation">(</span><span class="token number">123</span><span class="token punctuation">)</span> <span class="token comment">// error 类型“123”的参数不能赋给类型“object”的参数</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里涉及到的函数的相关知识，我们会在后面章节介绍的，你只要在这里明白 object 类型的使用就可以了。</p><h2 id="_7-symbol" tabindex="-1"><a class="header-anchor" href="#_7-symbol" aria-hidden="true">#</a> 7. symbol</h2><p>Symbol 是 ES6 加入的新的基础数据类型，因为它的知识比较多，所以我们单独在后面的一节进行讲解。</p><h2 id="本节小结" tabindex="-1"><a class="header-anchor" href="#本节小结" aria-hidden="true">#</a> 本节小结</h2><p>本小节我们学习了八个在 JavaScript 中我们就见过的数据类型，它们是：布尔类型、数值类型、字符串、数组、 null、undefined、object 以及 ES6 中新增的 symbol。在 TypeScript 中它们都有对应的类型关键字，对应关系为：</p><ul><li>布尔类型：boolean</li><li>数值类型：number</li><li>字符串类型：string</li><li>数组：<code>Array&lt;type&gt;</code>或 type[]</li><li>对象类型：object</li><li>Symbol 类型：symbol</li><li>null 和 undefined：null 和 undefined，这个比较特殊，它们自身即是类型, 也是基本数据类型</li></ul><p>这些类型是基础，我们后面的高级类型很多都是它们的组合或者变形，所以一定要把这些基础先学会。下个小节我 们将学习 TypeScript 中新增的几种类型，了解更多基本类型。</p>',48)],p={},o=(0,a(3744).Z)(p,[["render",function(n,s){return(0,e.wg)(),(0,e.iD)("div",null,t)}]])}}]);