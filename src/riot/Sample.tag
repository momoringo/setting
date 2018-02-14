
<sample>

    <h2>{list}</h2>

    <style scoped>

        h2 {
            color: #0D47A1;
        }

    </style>

    <script>
        import Test from '@/src/Test'


        var obj = {
            t:9,
            y:88
        }



        var obj2 = {
            ii:999,
            ...obj
        }


        async function fn() {
          return 42456576;
        }

        async function exec() {
          let result = await fn();
          console.log(result);
        }

        exec();

        var arr = [1,2,3]

        const t = new Test()

  
        var o = [9888,4,...arr]

        const j = () => {
            return o[0]
        }



        t.init()
        this.list = j()
    </script>

</sample>
