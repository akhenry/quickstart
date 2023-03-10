from time import sleep
from yamcs.client import YamcsClient

def write_array(start=0):
    processor.set_parameter_value("/myproject/Example_Array", [start + 0, start + 1, start + 2, start + 3, start + 4])

if __name__ == "__main__":
    client = YamcsClient("localhost:8090")
    processor = client.get_processor(instance="myproject", processor="realtime")

    print("\nWrite to a software parameter")
    offset = 0
    while True:
        write_array(offset)
        offset += 5
        sleep(1)